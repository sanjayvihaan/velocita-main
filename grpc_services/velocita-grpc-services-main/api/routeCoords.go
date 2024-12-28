package api

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/twpayne/go-polyline"
	routespb "google.golang.org/genproto/googleapis/maps/routing/v2"
	"google.golang.org/genproto/googleapis/type/latlng"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
)

const (
	fieldMask  = "*"
	apiKey     = ""
	serverAddr = "routes.googleapis.com:443"
)

func printErr(err error) {
	panic(err.Error())
}

func convertStrToFloat(originStrLa, originStrLo, destStrLa, destStrLo string) (Coordinates, error) {
	var coords Coordinates
	var err error

	funcParams := []string{originStrLa, originStrLo, destStrLa, destStrLo}

	for i, val := range funcParams {
		// Convert each string to float64
		var coordsVal float64
		coordsVal, err = strconv.ParseFloat(val, 64)
		if err != nil {
			fmt.Printf("Error converting parameter %d to float64: %s\n", i, err)
			return Coordinates{}, err
		}

		switch i {
		case 0:
			coords.OriginLat = coordsVal
		case 1:
			coords.OriginLong = coordsVal
		case 2:
			coords.DestLat = coordsVal
		case 3:
			coords.DestLong = coordsVal
		}
	}

	return coords, nil
}

func (s *Server) handleGetListOfCoords(w http.ResponseWriter, r *http.Request) {
	//gettting params:-
	fmt.Println("Getting list of coordinates from origin to destination")
	w.Header().Set("Content-Type", "application/json")

	// Getting params
	params := mux.Vars(r)

	// Getting origin and destination coordinates from request URL
	originStrLa := params["ambCoordLa"]
	originStrLo := params["ambCoordLo"]
	destStrLa := params["hospCoordLa"]
	destStrLo := params["hospCoordLo"]
	pincode := params["pin"]

	fmt.Printf("The type of pincode is %T, %v\n", pincode, pincode)
	// Converting coordinates from string to Coordinates struct
	coords, err := convertStrToFloat(originStrLa, originStrLo, destStrLa, destStrLo)
	if err != nil {
		printErr(err)
		return
	}

	fmt.Println(coords.OriginLat, coords.OriginLong, coords.DestLat, coords.DestLong)

	// performing grpc call to google maps routes api
	config := tls.Config{}
	conn, err := grpc.Dial(serverAddr,
		grpc.WithTransportCredentials(credentials.NewTLS(&config)))
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()
	client := routespb.NewRoutesClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), 4*time.Second)
	ctx = metadata.AppendToOutgoingContext(ctx, "X-Goog-Api-Key", apiKey)
	ctx = metadata.AppendToOutgoingContext(ctx, "X-Goog-Fieldmask", fieldMask)
	defer cancel()

	// create the origin using a latitude and longitude
	origin := &routespb.Waypoint{
		LocationType: &routespb.Waypoint_Location{
			Location: &routespb.Location{
				LatLng: &latlng.LatLng{
					Latitude:  coords.OriginLat,
					Longitude: coords.OriginLong,
				},
			},
		},
	}

	// create the destination using a latitude and longitude
	destination := &routespb.Waypoint{
		LocationType: &routespb.Waypoint_Location{
			Location: &routespb.Location{
				LatLng: &latlng.LatLng{
					Latitude:  coords.DestLat,
					Longitude: coords.DestLong,
				},
			},
		},
	}

	req := &routespb.ComputeRoutesRequest{
		Origin:                   origin,
		Destination:              destination,
		TravelMode:               routespb.RouteTravelMode_DRIVE,
		RoutingPreference:        routespb.RoutingPreference_TRAFFIC_AWARE,
		ComputeAlternativeRoutes: true,
		Units:                    routespb.Units_METRIC,
		RouteModifiers: &routespb.RouteModifiers{
			AvoidTolls:    false,
			AvoidHighways: true,
			AvoidFerries:  true,
		},
		PolylineQuality: routespb.PolylineQuality_OVERVIEW,
	}

	// execute rpc
	resp, err := client.ComputeRoutes(ctx, req)

	if err != nil {
		// "rpc error: code = InvalidArgument desc = Request contains an invalid
		// argument" may indicate that your project lacks access to Routes
		log.Fatal(err)
	}

	// fmt.Printf("Response: %v", resp)

	//decoding polyline
	encodedPolyline := resp.Routes[0].Legs[0].Polyline.GetEncodedPolyline()
	fmt.Println(encodedPolyline)

	//decoding the polyline
	result, err := decodePolyline([]byte(encodedPolyline))
	if err != nil {
		log.Fatal(err.Error())
	}

	// Create a Response struct for JSON
	response := Response{
		Coordinates: result,
	}

	fmt.Println(response)

	// Marshal the Response struct into JSON
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(jsonResponse)

	// fmt.Println(result)

}

// method to decode the polyline and return coordinates with a 5-index gap
func decodePolyline(buf []byte) ([][]float64, error) {
	coords, _, err := polyline.DecodeCoords(buf)
	if err != nil {
		return nil, err
	}

	if coords == nil {
		return nil, errors.New("Error decoding Polyline")
	}

	var result [][]float64
	for i := 0; i < len(coords); i += 5 {
		// Check if the current index is within the bounds of the slice
		if i < len(coords) {
			result = append(result, coords[i])
		}
	}

	return result, nil
}

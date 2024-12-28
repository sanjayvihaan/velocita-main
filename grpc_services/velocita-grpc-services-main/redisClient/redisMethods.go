package redisClient

import (
	"context"
	"fmt"
	"log"

	"github.com/redis/go-redis/v9"
)

/**
 * getNearbyVehicles method takes in 3 parameters ->
 * 1. pincode
 * 2. longitude
 * 3. latitude
 * The default radius and unit for this function is 0.1 km or 100 meters
 * This method needs to be used only for ambulance
 * - returns list of socketIds or vehicleIds if query matches
 */

func getNearbyVehicles(ctx context.Context, pincode string, lon, lat float64) ([]redis.GeoLocation, error) {
	//Perform geoserch query
	results, err := redisClient.GeoSearch(ctx, pincode, &redis.GeoSearchQuery{
		Longitude:  lat,
		Latitude:   lat,
		Radius:     100,
		RadiusUnit: "m", // Include distance in the result
	}).Result()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(results)
}

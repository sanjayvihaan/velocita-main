package api

//stores the origin and destination coordinates for performing the rpc call
type Coordinates struct {
	OriginLat  float64
	OriginLong float64
	DestLat    float64
	DestLong   float64
}

type Response struct {
	Coordinates [][]float64 `json:"coordinates"`
}

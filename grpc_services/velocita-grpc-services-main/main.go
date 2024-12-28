package main

import (
	"flag"
	"log"

	api "github.com/Tharun8951/proximity-services/api"
	// "github.com/Tharun8951/proximity-services/redisClient"
)

func main() {
	//connecting to redis
	// redisClient := redisClient.GetRedisClient()
	// // Ping the Redis server
	// pong, err := redisClient.Ping().Result()
	// if err != nil {
	// 	log.Fatal("Error pinging Redis:", err)
	// }

	// // Check the result
	// if pong == "PONG" {
	// 	fmt.Println("Redis server is responsive!")
	// } else {
	// 	fmt.Println("Unexpected response from Redis server:", pong)
	// }

	listenAddr := flag.String("listenaddr", ":8080", "the server address")
	flag.Parse()

	server := api.NewServer(*listenAddr)
	log.Fatal(server.Start())

}

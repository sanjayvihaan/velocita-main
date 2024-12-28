package redisClient

import (
	"github.com/redis/go-redis/v9"
)

var redisClient *redis.Client

func connectRedisClient() *redis.Client {
	// creating redis client
	return redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis server address
		Password: "",               // No password
		DB:       0,                // Default DB
	})
}

func GetRedisClient() *redis.Client {
	if redisClient == nil {
		redisClient = connectRedisClient()
	}
	return redisClient
}

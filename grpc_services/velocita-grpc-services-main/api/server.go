package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Server struct {
	listenAddr string
}

func NewServer(listenAddr string) *Server {
	return &Server{
		listenAddr: listenAddr,
	}
}

func (s *Server) Start() error {
	//initialising the mux router
	r := mux.NewRouter()

	// handling the routes
	r.HandleFunc("/getCoordsFromOriginToDest/{ambCoordLa}/{ambCoordLo}/{hospCoordLa}/{hospCoordLo}/{pin}", s.handleGetListOfCoords)

	// logging and returning the server
	fmt.Println("Server running on port: ", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, r)
}

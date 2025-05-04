package main

import (
	"math/rand"
	"time"
)

const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

var seedRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixMicro()))

func GenerateCode(size uint) string {

	var bytestr = make([]byte, 6)

	for i := range bytestr {
		bytestr[i] = charset[seedRand.Intn(len(charset))]
	}

	return string(bytestr)
}

func Gettimestamp() uint64 {
	return uint64(time.Now().UnixMilli())
}

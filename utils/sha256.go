package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func HashString(input string) string {
	hash := sha256.Sum256([]byte(input))
	return hex.EncodeToString(hash[:])
}

func HashBytes(input []byte) string {
	hash := sha256.Sum256(input)
	return hex.EncodeToString(hash[:])
}

func HashStringWithSalt(input, salt string) string {
	saltedInput := input + salt
	return HashString(saltedInput)
}

func HashMultipleStrings(inputs ...string) string {
	var combined string
	for _, input := range inputs {
		combined += input
	}
	return HashString(combined)
}

func CompareHash(input, expectedHash string) bool {
	actualHash := HashString(input)
	return actualHash == expectedHash
}

func CompareHashWithSalt(input, salt, expectedHash string) bool {
	actualHash := HashStringWithSalt(input, salt)
	return actualHash == expectedHash
}

func GetHashBytes(input string) []byte {
	hash := sha256.Sum256([]byte(input))
	return hash[:]
}

func HashToUppercase(input string) string {
	hash := HashString(input)
	return fmt.Sprintf("%X", hash)
}

func ValidateHashFormat(hash string) bool {
	if len(hash) != 64 {
		return false
	}

	// 16진수 문자열인지 확인
	_, err := hex.DecodeString(hash)
	return err == nil
}

func HashWithCustomSeparator(separator string, inputs ...string) string {
	var combined string
	for i, input := range inputs {
		if i > 0 {
			combined += separator
		}
		combined += input
	}
	return HashString(combined)
}

func GenerateHashPair(input string) (string, string) {
	hash := HashString(input)
	return input, hash
}

func BatchHashStrings(inputs []string) map[string]string {
	result := make(map[string]string)
	for _, input := range inputs {
		result[input] = HashString(input)
	}
	return result
}

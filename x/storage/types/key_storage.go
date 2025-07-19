package types

import "cosmossdk.io/collections"

// StorageKey is the prefix to retrieve all Storage
var StorageKey = collections.NewPrefix("storage/value/")

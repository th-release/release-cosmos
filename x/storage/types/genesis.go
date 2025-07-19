package types

import "fmt"

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		Params:     DefaultParams(),
		StorageMap: []Storage{}}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	storageIndexMap := make(map[string]struct{})

	for _, elem := range gs.StorageMap {
		index := fmt.Sprint(elem.Denom)
		if _, ok := storageIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for storage")
		}
		storageIndexMap[index] = struct{}{}
	}

	return gs.Params.Validate()
}

package types_test

import (
	"testing"

	"release/x/storage/types"

	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	tests := []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc:     "valid genesis state",
			genState: &types.GenesisState{StorageMap: []types.Storage{{Denom: "0"}, {Denom: "1"}}},
			valid:    true,
		}, {
			desc: "duplicated storage",
			genState: &types.GenesisState{
				StorageMap: []types.Storage{
					{
						Denom: "0",
					},
					{
						Denom: "0",
					},
				},
			},
			valid: false,
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}

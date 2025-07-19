package types

func NewMsgCreateData(owner string, denom string, key string, value string) *MsgCreateData {
	return &MsgCreateData{
		Owner: owner,
		Denom: denom,
		Key:   key,
		Value: value,
	}
}

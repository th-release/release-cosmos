package types

func NewMsgUpdateData(owner string, denom string, key string, value string) *MsgUpdateData {
	return &MsgUpdateData{
		Owner: owner,
		Denom: denom,
		Key:   key,
		Value: value,
	}
}

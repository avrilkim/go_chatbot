package models


type Keyboard struct {
	Type string `json:"type"`
}
type KakaoMessageRequest struct {
	Content        string `json:"content"`
}
type KakaoMessage struct {
	Message     string `json:"message"`
}
type DialogflowQuery struct {
	Query	string `json:"query"`
	Lang	string `json:"lang"`
	SessionId	string `json:"sessionId"`
}
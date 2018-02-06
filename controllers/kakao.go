package controllers

import (
	"fmt"
	"net/http"
	"chatbot/models"
	"github.com/labstack/echo"
	df "github.com/meinside/dialogflow-go"
	"reflect"
	wow "github.com/mitchellh/mapstructure"
)

//Dialogflow set info
const (
	token = "5b83e11f30a0493c81d3585e5504b080" //Client access token
	sessionId = "7996c020-19ba-43ff-afc5-47e26dc58e19"
	timezone = "Asia/Seoul"
)



func KakaoKeyboard() echo.HandlerFunc {
	return func(c echo.Context) error {
		kb := models.Keyboard{
			Type: "text",
		}
		return c.JSON(http.StatusOK, kb)
	}
}

type Parameters struct {
	Client_name []string          `json:"client_name"`
}

func KakaoMessage() echo.HandlerFunc {
	return func(c echo.Context) error {
		var msg models.KakaoMessage
		req := new(models.KakaoMessageRequest)
		if err := c.Bind(req); err != nil {
			return err
		}
		client := df.NewClient(token)
		client.Verbose = true // for verbose messages

		// query text
		if response, err := client.QueryText(df.QueryRequest{
			Query:     []string{req.Content},
			SessionId: sessionId,
			Language:  df.Korean,
			Timezone: timezone,

		}); err == nil {
			fmt.Printf(">>> response = %+v\n", response)
			if response.Result.Action == "ProjectSearch" {
				fmt.Println(reflect.TypeOf(response.Result.Parameters))
				var result Parameters
				err := wow.Decode(response.Result.Parameters, &result)
				if err != nil {
					panic(err)
				}
				msg = models.KakaoMessage{
					//Message: map[string]string{"text": "User_key="+request.User_key+" Type="+request.Type+" Content="+request.Content + " entity.Name="+response.Result.Fulfillment.Speech},
					//Message: string(response.Result.Fulfillment.Speech),
					Message: string(result.Client_name[0]+" 데이터를 검색중입니다."),
				}
			}else{
				msg = models.KakaoMessage{
					//Message: map[string]string{"text": "User_key="+request.User_key+" Type="+request.Type+" Content="+request.Content + " entity.Name="+response.Result.Fulfillment.Speech},
					//Message: string(response.Result.Fulfillment.Speech),
					Message: string(response.Result.Fulfillment.Speech),
				}
			}
		} else {
			fmt.Printf("*** error: %s\n", err)
		}
		return c.JSON(http.StatusOK, msg)
	}
}

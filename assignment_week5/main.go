package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Student struct
type Food struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Category string `json:"category"`
	Price    int    `json:"price"`
}

type Drink struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

var foods = []Food{
	{ID: "1", Name: "Pork Steak", Category: "Steak", Price: 60},
	{ID: "2", Name: "Caesar Salad", Category: "Salad", Price: 80},
	{ID: "3", Name: "Salmon Steak", Category: "Steak", Price: 150},
}

var drinks = []Drink{
	{ID: "1", Name: "Cola", Price: 20},
	{ID: "2", Name: "Green Tea", Price: 25},
	{ID: "3", Name: "Orange Juice", Price: 20},
}

func getFood(c *gin.Context) {
	FoodID := c.Query("ID")
	if FoodID != "" {
		var filter []Food
		for _, food := range foods {
			if fmt.Sprint(food.ID) == FoodID {
				filter = append(filter, food)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, foods)
}

func getDrink(c *gin.Context) {
	DrinkID := c.Query("ID")
	if DrinkID != "" {
		var filter []Drink
		for _, drink := range drinks {
			if fmt.Sprint(drink.ID) == DrinkID {
				filter = append(filter, drink)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, drinks)
}
func main() {
	r := gin.Default()

	r.GET("/Success", func(c *gin.Context) {
		c.JSON(200, gin.H{"Order Status": "Success"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/foods", getFood)
		api.GET("/drinks", getDrink)
	}

	r.Run(":8080")
}

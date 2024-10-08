package com.example.swiggy.Controller;

import com.example.swiggy.Utils.UtilClass;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpResponse;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

@RestController
@CrossOrigin(origins = "*")
public class Controller {

    @GetMapping("/onloadData")
    public ResponseEntity getOnloadData(@RequestParam("lat") String lat, @RequestParam("lng") String lng) {
        String url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=" + lat + "&lng=" + lng + "&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(url, String.class);
        return responseEntity;
    }

    @PostMapping("/dapi/restaurants/list/update")
    public ResponseEntity getSwiggyData(@RequestBody String payload) {
        // Replace the URL with your actual endpoint
        String apiUrl = "https://www.swiggy.com/dapi/restaurants/list/update";
        // Create an HttpEntity with headers and payload
        HttpEntity<String> requestEntity = new HttpEntity<>(payload, UtilClass.getSwiggyHeader());
        // Create a RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();
        // Make a POST request
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, requestEntity, String.class);
        return response;
    }

    @GetMapping("/dapi/misc/place-autocomplete")
    public ResponseEntity getPlaceAutocomplete(@RequestParam("input") String input, @RequestParam(required = false, name = "types") String types) {
        String url = "https://www.swiggy.com/dapi/misc/place-autocomplete?input=" + input + "&types=" + types;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(url, String.class);
        return responseEntity;
    }

    @GetMapping("/dapi/misc/address-recommend")
    public ResponseEntity getPlaceCoordinates(@RequestParam("place_id") String placeId) {
        String url = "https://www.swiggy.com/dapi/misc/address-recommend?place_id=" + placeId;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(url, String.class);
        return responseEntity;
    }

    @GetMapping("/dapi/menu/pl")
    public ResponseEntity getRestaurantMenu(@RequestParam("restaurantId") String restaurantId,
                                            @RequestParam("pageType") String pageType,
                                            @RequestParam("completeMenu") Boolean completeMenu,
                                            @RequestParam("lat") String lat,
                                            @RequestParam("lng") String lng,
                                            @RequestParam("catalogQa") String catalogQa,
                                            @RequestParam("submitAction") String submitAction) {
        String url =
                "https://www.swiggy.com/dapi/menu/pl?page-type=" + pageType + "&complete-menu=" + completeMenu.toString() + "&lat=" + lat + "&lng=" + lng + "&restaurantId=" + restaurantId + "&catalog_qa=" + catalogQa + "&submitAction=" + submitAction;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(url, String.class);
        return responseEntity;
    }

    @PostMapping("/dapi/menu/api/v1/json/layout-section/MENU_MULTI_OUTLET")
    public ResponseEntity getSiblingOutlets(@RequestBody String payload) {
        String url = "https://www.swiggy.com/dapi/menu/api/v1/json/layout-section/MENU_MULTI_OUTLET";
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = new HttpEntity<>(payload, UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.postForEntity(url, httpEntity, String.class);
        return responseEntity;
    }

    @GetMapping("/dapi/menu/pl/search")
    public ResponseEntity getRestaurantMenuSearch(@RequestParam String lat, @RequestParam String lng, @RequestParam String restaurantId, @RequestParam String query) {
        String url = "https://www.swiggy.com/dapi/menu/pl/search?lat="+lat+"&lng="+lng+"&restaurantId="+restaurantId+"&query="+query+"&submitAction=ENTER";
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity<>(null,UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.exchange(url, HttpMethod.GET,httpEntity, String.class);
        return responseEntity;
    }

    @GetMapping("/dapi/landing/PRE_SEARCH")
    public ResponseEntity getSearchPreSearch(@RequestParam String lat, @RequestParam String lng){
        String url = "https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=" + lat + "&lng=" + lng;
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity<>(null, UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.exchange(url, HttpMethod.GET,httpEntity, String.class);
        return responseEntity;
    }

    @GetMapping("/dapi/restaurants/search/v3")
    public ResponseEntity getSearchDishesRestaurant(@RequestParam String lat, @RequestParam String lng, @RequestParam String str, @RequestParam String selectedPLTab){
        String url = "https://www.swiggy.com/dapi/restaurants/search/v3?lat=" + lat + "&lng=" + lng + "&str=" + str + "&trackingId=1bd4025a-6136-21d6-e127-b71ea8964527&submitAction=ENTER&queryUniqueId=c860b415-162a-411b-eee4-3deea9520031&selectedPLTab=" + selectedPLTab;
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity<>(null, UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.exchange(url, HttpMethod.GET,httpEntity, String.class);
        return responseEntity;
    }

    @PostMapping("/dapi/cart")
    public ResponseEntity addItemToCart(@RequestBody String payload){
        String url = "https://www.swiggy.com/dapi/cart";
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity(payload, UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.postForEntity(url, httpEntity, String.class);
        return  responseEntity;
    }

    @GetMapping("/dapi/cart")
    public ResponseEntity getItemsInCart(){
        String url = "https://www.swiggy.com/dapi/cart";
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity<>(null, UtilClass.getSwiggyHeader());
        ResponseEntity responseEntity = restTemplate.exchange(url, HttpMethod.GET,httpEntity, String.class);
        return responseEntity;
    }

    @GetMapping("/test")
    public String getCompletable(){
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
        return "hell";
    }
    
}


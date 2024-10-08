package com.example.swiggy.Utils;

import org.springframework.http.HttpHeaders;

import java.util.concurrent.CompletableFuture;

public class UtilClass {

    public static HttpHeaders getSwiggyHeader(){
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("Accept-Language", "en-GB,en;q=0.9,en-US;q=0.8,sv;q=0.7,kn;q=0.6,fil;q=0.5");
        headers.set("Connection", "keep-alive");
        headers.set("Cookie", "__SW=9ZKn9ZkoWePQelRj2E4ca6WhrANEWkK5; _device_id=a3f7df9e-8d4f-e562-7462-dcb9db4744b1; _gcl_au=1.1.894659509.1706948204; fontsLoaded=1; _session_tid=eb5c1d3e0f4560d112908b2b5f50526d7093e089ea94a24c11e103c92ff10f2e5afab76d74025c42892717e9eb5fb18448361f5e9ee0d6525e1e23b7de8832e18e16cd4a89746679af57c56d3ded9fe75da3e9dc7a459c0bc544f74f319db73088c9caf17530fa1aa0748eacb13adb03; _is_logged_in=1; _gid=GA1.2.1817752149.1710684946; _ot=REGULAR; userLocation={%22address%22:%22Bagalakunte%2C%20Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22deliveryLocation%22:%22Bagalakunte%22%2C%22lat%22:13.052706%2C%22lng%22:77.4954875}; dadl=true; _ga_4BQKMMC7Y9=GS1.2.1710745390.35.1.1710749549.60.0.0; _ga_34JYJ0BCRN=GS1.1.1710749536.76.1.1710749614.0.0.0; _ga=GA1.2.649687373.1706948214");
        headers.set("Origin", "https://www.swiggy.com");
        headers.set("Referer", "https://www.swiggy.com/");
        headers.set("Sec-Fetch-Dest", "empty");
        headers.set("Sec-Fetch-Mode", "cors");
        headers.set("Sec-Fetch-Site", "same-origin");
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
        headers.set("__fetch_req__", "true");
        headers.set("Content-Type", "application/json");
        headers.set("sec-ch-ua", "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"");
        headers.set("sec-ch-ua-mobile", "?0");
        headers.set("sec-ch-ua-platform", "\"Windows\"");
        return headers;
    }

}

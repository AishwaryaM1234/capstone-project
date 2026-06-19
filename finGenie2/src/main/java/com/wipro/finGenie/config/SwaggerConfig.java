package com.wipro.finGenie.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        Info apiInfo = new Info()
                .title("FinGenie API")
                .version("1.0")
                .description("Digital Banking Application");

        return new OpenAPI()
                .info(apiInfo);
    }
}

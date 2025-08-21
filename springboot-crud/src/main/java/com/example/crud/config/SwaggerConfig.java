package com.example.crud.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Config cho Swagger (OpenAPI 3).
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(
                new Info()
                        .title("CRUD API - Spring Boot + H2")
                        .version("1.0")
                        .description("API CRUD cho Category, Product, User (Spring Boot + H2 + DTO + Exception Handling)")
        );
    }
}

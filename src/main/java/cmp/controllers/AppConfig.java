package cmp.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;

@Configuration
@ComponentScan(basePackages = "com.app")
public class AppConfig {

    @Bean
    public AnnotationMethodHandlerAdapter annotationMethodHandlerAdapter()
    {
        final AnnotationMethodHandlerAdapter annotationMethodHandlerAdapter = new AnnotationMethodHandlerAdapter();
        final MappingJackson2HttpMessageConverter mappingJacksonHttpMessageConverter = new MappingJackson2HttpMessageConverter();

        HttpMessageConverter<?>[] httpMessageConverter = { mappingJacksonHttpMessageConverter };

        String[] supportedHttpMethods = { "POST", "GET", "HEAD" };

        annotationMethodHandlerAdapter.setMessageConverters(httpMessageConverter);
        annotationMethodHandlerAdapter.setSupportedMethods(supportedHttpMethods);

        return annotationMethodHandlerAdapter;
    }

}

package hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

@SpringBootApplication
public class Application extends WebMvcConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	    registry
	      .addResourceHandler("/static/**")
	      .addResourceLocations("/resources/app/")
	      .setCachePeriod(3600)
	      .resourceChain(true)
	      .addResolver(new PathResourceResolver());
	}
}

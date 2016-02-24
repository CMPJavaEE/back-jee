package cmp.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@Configuration
public class RepoConfig extends RepositoryRestMvcConfiguration
{
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config)
    {
        super.configureRepositoryRestConfiguration(config);
        config.exposeIdsFor(Language.class);
        config.exposeIdsFor(Notification.class);
        config.exposeIdsFor(Project.class);
        config.exposeIdsFor(User.class);
    }
}

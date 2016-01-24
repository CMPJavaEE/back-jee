package cmp.controllers;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "language", path = "language")
public interface LanguageRepository extends PagingAndSortingRepository<User, Long> {

}

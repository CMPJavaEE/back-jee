package cmp.controllers;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepo;

    @RequestMapping(value = "/{projectID}/addCandidat/{UID}", method = RequestMethod.POST)
    public ResponseEntity<?> addCandidat(@PathVariable("projectID") Project prj, @PathVariable("UID") User candidat) 
	{
		if(prj == null || candidat == null)
			return new ResponseEntity<String>("Project or User not found !!", HttpStatus.BAD_REQUEST);
		else
		{
			prj.registrations.add(candidat);
			projectRepo.save(prj);
			return new ResponseEntity<String>("OK", HttpStatus.OK);
		}
    }
}

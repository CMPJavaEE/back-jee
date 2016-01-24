package cmp.controllers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Id;
import java.util.Date;
import java.util.List;

@Entity
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String description;
	@ManyToOne
	private User owner;
	private String title;
	private int duration;
	private float budget;
	private String image;
	private Date creationDate;
	private boolean ended;
	private boolean started;

	@ManyToMany()
	private List<Project> registrations;
}

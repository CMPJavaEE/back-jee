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
	public long id;

	public String description;
	@ManyToOne
	public User owner;
	public String title;
	public int duration;
	public float budget;
	public String image;
	public Date creationDate;
	public boolean ended;
	public boolean started;

	@ManyToMany()
	public List<User> registrations;
}

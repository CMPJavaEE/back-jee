package cmp.controllers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import java.io.Serializable;
import java.util.List;

@Entity(name="Users")
public class User implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long id;

	public String firstName;
	public String lastName;
	public String login;
	public String description;
	public String avatar;
	public boolean isDevelopper;
	public boolean isProvider;
	public String password;
	public String email;
	public String gitHub;
	public String twitter;
	public String linkdin;
	public boolean isAdmin;

	@ManyToMany(cascade=CascadeType.DETACH)
	public List<Language> progLangs;

	@ManyToMany(cascade=CascadeType.ALL)
	public List<Project> registeredProjects;

	@OneToMany(mappedBy="owner", cascade=CascadeType.ALL)
	public List<Project> createdProjects;

	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	public List<Notification> notifications;


}

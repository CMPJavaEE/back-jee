package cmp.controllers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Id;
import java.util.List;

@Entity(name="Users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String firstName;
	private String lastName;
	private String nick;
	private String description;
	private String avatar;
	private boolean isDevelopper;
	private boolean isProvider;
	private String mpd;
	private String email;
	private String gitHub;
	private String twitter;
	private String linkdin;
	private boolean idAdmin;

	@ManyToMany
	private List<Language> progLangs;

	@ManyToMany
	private List<Project> registeredProjects;

	@OneToMany(mappedBy="owner")
	private List<Project> createdProjects;

	@OneToMany(mappedBy="user")
	private List<Notification> notifications;
}

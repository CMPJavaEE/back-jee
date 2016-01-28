package cmp.controllers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToMany;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Language {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long id;

	public String tag;

	@ManyToMany()
	public List<User> programmers;
}

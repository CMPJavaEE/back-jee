package cmp.controllers;

import java.io.Serializable;

public class NewUserForm implements Serializable {
    public String	login;
    public String	password;
	public String	email;
	public boolean	is_provider;
	public boolean	is_dev;
}




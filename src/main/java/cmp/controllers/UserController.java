package cmp.controllers;

import java.util.List;
import java.util.Random;
import org.springframework.security.crypto.bcrypt.BCrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository urepo;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody final LoginForm login) 
	{
		User u = urepo.findOneByLoginOrEmail(login.login, login.login);
		if(u != null)
		{
			if(BCrypt.checkpw(login.password, u.password))
			{
				u.password = "";
				return new ResponseEntity<User>(u, HttpStatus.OK);
			}
			else
				return new ResponseEntity<String>("Error : False login or password", HttpStatus.BAD_REQUEST);
		}
		else
			return new ResponseEntity<String>("Error : False login or password", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<?> createuser(@RequestBody final NewUserForm newUser)
	{
		if(urepo.findOneByLoginOrEmail(newUser.login, newUser.email) == null)
		{
			User u = new User();
			u.login = newUser.login;
			u.isDevelopper = newUser.is_dev;
			u.isProvider = newUser.is_provider;
			u.email = newUser.email;
			u.lastName = newUser.lastName;
			u.firstName = newUser.firstName;
			
			String salt = BCrypt.gensalt(15);

			u.password = BCrypt.hashpw(newUser.password, salt);
			urepo.save(u);

			return new ResponseEntity<User>(u, HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("Error : Invalid Login log, mail or password", HttpStatus.BAD_REQUEST);
		}
	}

}

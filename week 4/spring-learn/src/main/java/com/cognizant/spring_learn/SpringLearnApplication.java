package com.cognizant.spring_learn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class SpringLearnApplication {
	private static final Logger LOGGER =
        LoggerFactory.getLogger(SpringLearnApplication.class);
		public static void displayCountry() {

    ApplicationContext context =
            new ClassPathXmlApplicationContext("country.xml");

    Country country = context.getBean("country", Country.class);

    System.out.println("Country : " + country);
}

	public static void main(String[] args) {
		SpringApplication.run(SpringLearnApplication.class, args);
displayCountry();
	}

}

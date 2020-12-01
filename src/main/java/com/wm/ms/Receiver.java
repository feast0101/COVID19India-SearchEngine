package com.wm.ms;

import org.springframework.stereotype.Component;


public class Receiver {

	public void receiveMessage(String message) {
		System.out.println("Message Received <" + message + ">");
	}

}
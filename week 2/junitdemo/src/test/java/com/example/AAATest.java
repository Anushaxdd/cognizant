package com.example;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class AAATest {

    private int a;
    private int b;

    @Before
    public void setUp() {
        System.out.println("Setting up test...");
        a = 2;
        b = 3;
    }

    @After
    public void tearDown() {
        System.out.println("Cleaning up after test...");
    }

    @Test
    public void testAddition() {

        // Arrange
        int expected = 5;

        // Act
        int result = a + b;

        // Assert
        assertEquals(expected, result);
    }
}
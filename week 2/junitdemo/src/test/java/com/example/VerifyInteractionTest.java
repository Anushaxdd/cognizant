package com.example;

import static org.mockito.Mockito.*;

import org.junit.Test;

public class VerifyInteractionTest {

    @Test
    public void testVerifyInteraction() {

        // Create mock object
        ExternalApi mockApi = mock(ExternalApi.class);

        // Create service with mocked API
        MyService service = new MyService(mockApi);

        // Call the method
        service.fetchData();

        // Verify that getData() was called exactly once
        verify(mockApi).getData();
    }
}
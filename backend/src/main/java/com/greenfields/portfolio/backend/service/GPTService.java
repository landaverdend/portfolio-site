package com.greenfields.portfolio.backend.service;

import com.greenfields.portfolio.backend.dto.ClientChatLog;
import com.greenfields.portfolio.backend.dto.CoverLetterDTO;
import com.greenfields.portfolio.backend.util.JsonUtil;
import org.springframework.ai.chat.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Service
public class GPTService {


    @Autowired
    private ResourceLoader resourceLoader;

    private final ChatClient chatClient;

    private final StringBuilder chatPrompt;

    private final StringBuilder coverLetterPrompt;

    public GPTService(ChatClient chatClient, ResourceLoader resourceLoader) {
        this.chatClient = chatClient;
        this.resourceLoader = resourceLoader;
        String chatPrompt = "";
        String coverLetterPrompt = "";
        try {
            chatPrompt = loadPromptFromFile("chatPrompt.txt");
            coverLetterPrompt = loadPromptFromFile("coverLetterPrompt.txt");
        }
        catch (Exception e) {

        }

        this.chatPrompt = new StringBuilder(chatPrompt);
        this.coverLetterPrompt = new StringBuilder(coverLetterPrompt);
    }

    public String chatPrompt(ClientChatLog clientChatLog) {


        StringBuilder copy = new StringBuilder(chatPrompt);
        String response = chatClient.call(
                copy.append(
                        JsonUtil.convertObjectToJson(clientChatLog.getClientChatLog())
                ).toString()
        );
        return response;
    }

    public String promptForCoverLetter(CoverLetterDTO coverLetterDTO) {
        String response = "";

        try {
            StringBuilder copy = new StringBuilder(coverLetterPrompt);
            String thePrompt = generateCoverLetterPrompt(copy.toString(), coverLetterDTO);
            System.out.println(thePrompt);
            response = chatClient.call(thePrompt);

        } catch (Exception e ) {

        }

        return response;
    }

    public static String generateCoverLetterPrompt(String thePromptTemplate, CoverLetterDTO dto) throws IllegalAccessException {
        // Get all fields from the DTO using reflection
        Field[] fields = dto.getClass().getDeclaredFields();

        // Replace each placeholder dynamically
        for (Field field : fields) {
            field.setAccessible(true); // Allow access to private fields
            String placeholder = "${" + field.getName() + "}";

            // Convert field value to a string (handle lists)
            Object value = field.get(dto);
            String replacement = value instanceof List
                    ? String.join(", ", (List<String>) value)
                    : value != null ? value.toString() : "";

            thePromptTemplate = thePromptTemplate.replace(placeholder, replacement);
        }

        return thePromptTemplate;
    }

    private String loadPromptFromFile(String fileName) throws IOException {


        // Load the file from resources
        Resource resource = resourceLoader.getResource("classpath:" + fileName);

        // Read the file content
        StringBuilder contentBuilder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                contentBuilder.append(line).append("\n");
            }
        }

        return contentBuilder.toString();
    }
}

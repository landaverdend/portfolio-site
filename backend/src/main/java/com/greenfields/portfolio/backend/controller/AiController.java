package com.greenfields.portfolio.backend.controller;


import com.greenfields.portfolio.backend.dto.ClientChatLog;
import com.greenfields.portfolio.backend.dto.CoverLetterDTO;
import com.greenfields.portfolio.backend.service.GPTService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AiController {

    private final GPTService gptService;

    public AiController(GPTService gptService) {
        this.gptService = gptService;
    }

    @PostMapping("/chat")
    public ResponseEntity<String> promptGPT(@RequestBody ClientChatLog clientChatLog){

        try {
            String response = gptService.chatPrompt(clientChatLog);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cover_letter")
    public ResponseEntity<String> promptGPT(@RequestBody CoverLetterDTO coverLetterDTO) {

        try {
            String response = gptService.promptForCoverLetter(coverLetterDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

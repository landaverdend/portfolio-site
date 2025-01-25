package com.greenfields.portfolio.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class CoverLetterDTO {

    String position;

    String company;

    String tone;

    Integer wordCount;

    String otherDetails;

    List<String> cloudTechnologies;

    List<String> personalityTraits;

    List<String> frameworks;

}

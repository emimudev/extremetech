package com.kg.extremetech.responses;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.FieldError;

public class ErrorResult implements Serializable {
  public List<ErrorField> errors = new ArrayList<>();

  public static ErrorResult from(List<FieldError> errors) {
    ErrorResult result = new ErrorResult();
    for (FieldError fieldError : errors) {
      ErrorField errorField = new ErrorField();
      errorField.field = fieldError.getField();
      errorField.rejectedValue = fieldError.getRejectedValue();
      errorField.message = fieldError.getDefaultMessage();
      result.errors.add(errorField);
    }
    return result;
  }

}

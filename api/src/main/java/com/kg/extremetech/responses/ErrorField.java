package com.kg.extremetech.responses;

import java.io.Serializable;

import lombok.ToString;

@ToString
public class ErrorField implements Serializable {
  public String field;
  public Object rejectedValue;
  public String message;

  public ErrorField() {
  }

  public ErrorField(String field, Object rejectedValue, String message) {
    this.field = field;
    this.rejectedValue = rejectedValue;
    this.message = message;
  }
}

package com.kg.extremetech.controllers;

import java.util.NoSuchElementException;
import java.util.regex.Pattern;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.kg.extremetech.exceptions.RefreshTokenException;
import com.kg.extremetech.responses.ErrorField;
import com.kg.extremetech.responses.ErrorResult;
import com.kg.extremetech.responses.Response;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalAdviceController {

  @ExceptionHandler({ NoResourceFoundException.class })
  public ResponseEntity<Response<Object>> handle(NoResourceFoundException e) {
    return Response.notFound("The endpoint " + e.getResourcePath() + " could not be found");
  }

  @ExceptionHandler({ UsernameNotFoundException.class })
  public ResponseEntity<Response<Object>> handle(UsernameNotFoundException e) {
    return Response.notFound(e.getMessage());
  }

  @ExceptionHandler({ NoSuchElementException.class })
  public ResponseEntity<Response<Object>> handle(NoSuchElementException e) {
    return Response.notFound(e.getMessage());
  }

  @ExceptionHandler({
      RefreshTokenException.class,
      IllegalArgumentException.class,
      InvalidDataAccessApiUsageException.class
  })
  public ResponseEntity<Response<Object>> handleGenericBadRequest(Exception e) {
    return Response.badRequest(e.getMessage());
  }

  @ExceptionHandler({ HttpMessageConversionException.class })
  public ResponseEntity<Response<Object>> handle(HttpMessageConversionException e) {
    return Response.badRequest("Invalid request body");
  }

  @ExceptionHandler({ ConstraintViolationException.class })
  public ResponseEntity<Response<Object>> handle(ConstraintViolationException e) {
    return Response.invalidEntity(e.getMessage());
  }

  @ExceptionHandler({ DuplicateKeyException.class, DataIntegrityViolationException.class })
  public ResponseEntity<Response<Object>> handle(DuplicateKeyException e) {
    try {
      final var pattern = Pattern.compile("(\\w+):\\s*\\\"(.*)\\\"", Pattern.CASE_INSENSITIVE);
      final var matcher = pattern.matcher(e.getMessage());
      if (matcher.find()) {
        final var key = matcher.group(1);
        final var value = matcher.group(2);
        final var errorResult = new ErrorResult();
        errorResult.errors.add(new ErrorField(key, value, key + " already exists"));
        return Response.build(errorResult, "This resource already exists", HttpStatus.CONFLICT);
      } else {
        return Response.conflict(e.getMessage());
      }
    } catch (Exception ex) {
      return Response.conflict(e.getMessage());
    }
  }

  @ExceptionHandler({ MethodArgumentNotValidException.class })
  public ResponseEntity<Response<Object>> handle(MethodArgumentNotValidException e) {
    final var errorResult = ErrorResult.from(e.getFieldErrors());
    final var errorMessage = "Unable to process the entity";
    return Response.build(errorResult, errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @ExceptionHandler({ AuthenticationException.class })
  public ResponseEntity<Response<Object>> handle(AuthenticationException e) {
    return Response.build(null, e.getMessage(), HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler({ AccessDeniedException.class })
  public ResponseEntity<Response<Object>> handle(AccessDeniedException e) {
    return Response.build(null, e.getMessage(), HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler({ ExpiredJwtException.class })
  public ResponseEntity<Response<Object>> handle(ExpiredJwtException e) {
    return Response.build(null, e.getMessage(), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler({ JwtException.class })
  public ResponseEntity<Response<Object>> handle(JwtException e) {
    return Response.build(null, e.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler({ Exception.class })
  public ResponseEntity<Response<Object>> handle(Exception e) {
    System.out.println(e);
    return Response.internalError(e.getMessage());
  }

}

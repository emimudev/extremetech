package com.kg.extremetech.responses;

import java.io.Serializable;
import java.util.function.Function;
import java.util.function.Supplier;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Base class for all API responses.
 * 
 * <p>
 * This class is a wrapper for the response body, message and status code.
 * </p>
 */
public class Response<T> implements Serializable {
  public T content = null;
  public String message;
  public HttpStatus status;
  public Integer statusCode;
  public static String DEFAULT_MESSAGE = "Success";
  public static String DEFAULT_NOT_FOUND_MESSAGE = "Resource not found";
  public static HttpStatus DEFAULT_STATUS = HttpStatus.OK;
  public static Integer DEFAULT_PAGE = 1;
  public static Integer DEFAULT_PAGE_SIZE = 10;

  public Response() {
    this(null, DEFAULT_MESSAGE, DEFAULT_STATUS);
  }

  public Response(T body) {
    this(body, DEFAULT_MESSAGE, DEFAULT_STATUS);
  }

  public Response(T body, String message) {
    this(body, message, DEFAULT_STATUS);
  }

  public Response(T body, HttpStatus status) {
    this(body, DEFAULT_MESSAGE, status);
  }

  public Response(T body, String message, HttpStatus status) {
    this.content = body;
    this.message = message;
    this.status = status;
    this.statusCode = status.value();
  }

  public static <T> ResponseEntity<Response<T>> ok() {
    return Response.build(null);
  }

  public static <T> ResponseEntity<Response<T>> ok(T body) {
    return Response.build(body, DEFAULT_MESSAGE, HttpStatus.OK);
  }

  public static <T> ResponseEntity<Response<T>> ok(T body, String message) {
    return Response.build(body, message, HttpStatus.OK);
  }

  public static <T> ResponseEntity<Response<T>> notFound() {
    return Response.build(null, DEFAULT_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
  }

  public static <T> ResponseEntity<Response<T>> notFound(T body, String message) {
    return Response.build(body, message, HttpStatus.NOT_FOUND);
  }

  public static <T> ResponseEntity<Response<T>> notFound(String message) {
    return Response.build(null, message, HttpStatus.NOT_FOUND);
  }

  public static <T> ResponseEntity<Response<T>> badRequest() {
    return Response.build(null, HttpStatus.BAD_REQUEST.getReasonPhrase(), HttpStatus.BAD_REQUEST);
  }

  public static <T> ResponseEntity<Response<T>> badRequest(String message) {
    return Response.build(null, message, HttpStatus.BAD_REQUEST);
  }

  public static <T> ResponseEntity<Response<T>> conflict() {
    return Response.build(null, HttpStatus.CONFLICT.getReasonPhrase(), HttpStatus.CONFLICT);
  }

  public static <T> ResponseEntity<Response<T>> conflict(String message) {
    return Response.build(null, message, HttpStatus.CONFLICT);
  }

  public static <T> ResponseEntity<Response<T>> invalidEntity() {
    return Response.build(null, HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(), HttpStatus.UNPROCESSABLE_ENTITY);
  }

  public static <T> ResponseEntity<Response<T>> invalidEntity(String message) {
    return Response.build(null, message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  public static <T> ResponseEntity<Response<T>> invalidEntity(T body, String message) {
    return Response.build(body, message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  public static <T> ResponseEntity<Response<T>> internalError() {
    return Response.build(null, HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public static <T> ResponseEntity<Response<T>> internalError(String message) {
    return Response.build(null, message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  public static <T> ResponseEntity<Response<T>> build(T body) {
    final var apiResponse = new Response<T>(body);
    return new ResponseEntity<>(apiResponse, apiResponse.status);
  }

  public static <T> ResponseEntity<Response<T>> build(T body, String message) {
    final var apiResponse = new Response<T>(body, message);
    return new ResponseEntity<>(apiResponse, apiResponse.status);
  }

  public static <T> ResponseEntity<Response<T>> build(T body, HttpStatus status) {
    final var apiResponse = new Response<T>(body, status.toString(), status);
    return new ResponseEntity<>(apiResponse, apiResponse.status);
  }

  public static <T> ResponseEntity<Response<T>> build(T body, String message, HttpStatus status) {
    final var apiResponse = new Response<T>(body, message, status);
    return new ResponseEntity<>(apiResponse, status);
  }

  public static <T> ResponseEntity<Response<T>> of(Supplier<T> callback) {
    final var body = callback.get();
    return Response.ok(body);
  }

  public static ResponseEntity<Response<Object>> of(Runnable callback) {
    callback.run();
    return Response.ok(null);
  }

  public static <T> ResponseEntity<Response<PageResult<T>>> of(
      Integer page,
      Integer size,
      Function<PageRequest, Page<T>> callback) {
    final var pageRequest = getPageRequest(page, size);
    final var slice = callback.apply(pageRequest);
    final var responsePage = new PageResult<T>();
    responsePage.results = slice.getContent();
    responsePage.page = slice.getNumber() + 1;
    responsePage.pageSize = slice.getSize();
    responsePage.totalElements = slice.getTotalElements();
    responsePage.totalPages = slice.getTotalPages();
    responsePage.offset = slice.getNumber() * slice.getSize();
    responsePage.hasNext = slice.hasNext();
    responsePage.hasPrevious = slice.hasPrevious();
    return Response.ok(responsePage);
  }

  private static PageRequest getPageRequest(Integer page, Integer size) {
    final var currentPage = page == null ? DEFAULT_PAGE : page;
    final var currentSize = size == null ? DEFAULT_PAGE_SIZE : size;
    return PageRequest.of(currentPage - 1, currentSize);
  }

}

package com.kg.extremetech.responses;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PageResult<T> implements Serializable {
  public Integer page;
  public Integer pageSize;
  public Long totalElements;
  public Integer totalPages;
  public Integer offset;
  public Boolean hasNext;
  public Boolean hasPrevious;
  public List<T> results = new ArrayList<>();
}

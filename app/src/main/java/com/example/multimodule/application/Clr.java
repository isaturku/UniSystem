//package com.example.multimodule.application;
//
//
//import com.example.multimodule.service.model.Book;
//import com.example.multimodule.service.repository.BookRepository;
//import com.example.multimodule.service.repository.CategoryRepository;
//import com.example.multimodule.service.services.BorrowingService;
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.IntSummaryStatistics;
//import java.util.List;
//import java.util.Locale;
//import java.util.stream.IntStream;
//
//@Component
//@Log4j2
//public class Clr implements CommandLineRunner {
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final CategoryRepository categoryRepository;
//    private final BookRepository bookRepository;
//    private final BorrowingService borrowingService;
//
//    public Clr(CategoryRepository categoryRepository, BookRepository bookRepository, BorrowingService borrowingService) {
//        this.categoryRepository = categoryRepository;
//        this.bookRepository = bookRepository;
//        this.borrowingService = borrowingService;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        bookRepository.findAll(PageRequest.of(1,5)).get().forEach(book -> log.info(book.isAvailable()));
//    }
//}

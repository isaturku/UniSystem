package com.example.multimodule.api.controllers;

import com.example.multimodule.service.model.Book;
import com.example.multimodule.service.model.BookRequest;
import com.example.multimodule.service.services.BookService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/books")
@Log4j2
public class BookController {
    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List<Book> getBooks(Pageable pageable){
        return service.getBooks(pageable);
    }
    @GetMapping("/count")
    public int getCount(){
        return service.getCount();
    }
    @PostMapping
    @PreAuthorize("hasRole('ROLE_LIBRARIAN')")
    public void newBook(@RequestBody BookRequest request){
        service.insertBook(request.olid(), request.title(),request.author(),true);
    }
}

package com.example.multimodule.api.controllers;

import com.example.multimodule.service.model.Borrowing;
import com.example.multimodule.service.services.BorrowingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/loans")
public class BorrowController {
    private final BorrowingService service;

    public BorrowController(BorrowingService service) {
        this.service = service;
    }

    @GetMapping("/current")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Borrowing> getCurrentLoans(Principal principal){
        return service.getCurrentLoansForUser(principal.getName());
    }
    @GetMapping("/previous")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Borrowing> getPreviousLoans(Principal principal){
        return service.getPreviousLoansForUser(principal.getName());
    }
    @GetMapping("/future")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Borrowing> getShortListingsForUSer(Principal principal){
        return service.getShortListingsForUser(principal.getName());
    }
    @PostMapping("/borrow/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String borrowBook(Principal principal, @PathVariable int bookId){
        return service.borrowBook(bookId, principal.getName());
    }
    @PostMapping("/shortlist/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String shortlistBook(Principal principal, @PathVariable int bookId){
        return service.shortlistBook(bookId, principal.getName());
    }
}

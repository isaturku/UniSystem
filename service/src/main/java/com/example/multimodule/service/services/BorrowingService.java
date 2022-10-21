package com.example.multimodule.service.services;

import com.example.multimodule.service.model.Book;
import com.example.multimodule.service.model.Borrowing;
import com.example.multimodule.service.repository.BorrowingRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;
import java.util.List;

@Service
public class BorrowingService {

    private final int BORROWING_LIMIT = 5;
    private final int SHORTLISTING_LIMIT = 3;

    private final BorrowingRepository repo;
    private final BookService bookService;
    private final UserService userService;

    public BorrowingService(BorrowingRepository repo, BookService bookService, UserService userService) {
        this.repo = repo;
        this.bookService = bookService;
        this.userService = userService;
    }

    private void newLoan(String username, int bookId){
        Instant week = Instant.now().plus(7, ChronoUnit.DAYS);
        Borrowing borrowing = new Borrowing();
        borrowing.setBook(bookService.getBookById(bookId));
        borrowing.setUser(userService.getUserByUsename(username));
        borrowing.setEndDate(Timestamp.from(week));
        repo.save(borrowing);
    }
    private void newShortlisting(String username, int bookId){
        Timestamp startDate = bookService.getAvailableByDateById(bookId);
        Timestamp endDate = Timestamp.from(startDate.toInstant().plus(7,ChronoUnit.DAYS));
        Borrowing borrowing = new Borrowing();
        borrowing.setBook(bookService.getBookById(bookId));
        borrowing.setUser(userService.getUserByUsename(username));
        borrowing.setStartDate(startDate);
        borrowing.setEndDate(endDate);
        repo.save(borrowing);
    }
    private boolean alreadyBorrowed(int bookId, String username){
        return getCurrentLoansForUser(username).stream().anyMatch(borrowing -> borrowing.getBook().getId() == bookId);
    }
    private boolean alreadyShortListed(int bookId, String username){
        return  getShortListingsForUser(username).stream().anyMatch(borrowing -> borrowing.getBook().getId() == bookId);
    }
    public String  borrowBook(int bookId, String username){
        if(alreadyBorrowed(bookId,username))
            return "Book is already borrowed.";
        if(!bookService.checkAvailableById(bookId))
            return "Book is not available.";
        if(repo.getBorrowingsByUsername(username).size() >= BORROWING_LIMIT)
            return "Limit of borrowed books is reached.";
        else {
            newLoan(username, bookId);
            return "Succesful.";
        }

    }
    public String shortlistBook(int bookId, String username){
        if(alreadyBorrowed(bookId,username))
            return "Book is already borrowed by this user.";
        if(alreadyShortListed(bookId,username))
            return "Book is already shortlisted.";
        if(repo.getShortlistingsByUsername(username).size() >= SHORTLISTING_LIMIT)
            return "Limit of shortlisted books is reached.";
        else {
            newShortlisting(username,bookId);
            return "Succesful.";
        }
    }
    public List<Borrowing> getCurrentLoansForUser(String username){
        return repo.getBorrowingsByUsername(username);
    }
    public List<Borrowing> getPreviousLoansForUser(String username){
        return repo.getPreviousBorrowing(username);
    }
    public List<Borrowing> getShortListingsForUser(String username){
        return repo.getShortlistingsByUsername(username);
    }
}

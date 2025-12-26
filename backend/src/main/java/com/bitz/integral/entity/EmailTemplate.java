package com.bitz.integral.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "email_templates")
public class EmailTemplate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "template_name", unique = true, nullable = false, length = 100)
    private String templateName;
    
    @Column(nullable = false)
    private String subject;
    
    @Column(name = "body_html", columnDefinition = "TEXT", nullable = false)
    private String bodyHtml;
    
    @Column(name = "body_text", columnDefinition = "TEXT")
    private String bodyText;
    
    @Column(columnDefinition = "JSON")
    private String variables;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

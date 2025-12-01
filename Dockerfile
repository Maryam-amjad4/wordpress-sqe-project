FROM wordpress:latest

# Set working directory
WORKDIR /var/www/html

# Copy custom wp-content if needed
# COPY wp-content/ /var/www/html/wp-content/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 80

# Use default WordPress entrypoint
CMD ["apache2-foreground"]


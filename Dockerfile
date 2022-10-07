# Using latest stable playwright version.
FROM mcr.microsoft.com/playwright:v1.26.1

# Defining workdir as /tests.
WORKDIR /tests

# Copy all content into root.
COPY . .

# Install playwright (dependencies which includes chromium).
RUN npm install
RUN npx playwright install

# Use the script as entrypoint for multiple test run.
ENTRYPOINT ["scripts/start-tests.sh"]

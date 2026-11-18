/**
 * Student Name: Presley McFarlane-Goolcharan
 * Version 1.0.0
 * COMP-3018
 * This module defines Jest mock setup.
 */

// Always mock firebase in every test
jest.mock("../config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
        doc: jest.fn(),
    },
}));

// Reset all mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});
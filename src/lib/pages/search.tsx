"use client";

import ClassroomResultGroup from "@/components/SearchPage/ClassroomResultGroup";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import SearchHeaderPanel from "@/components/SearchPage/SearchHeaderPanel";
import UserResultGroup from "@/components/SearchPage/UserResultGroup";
import SearchPanel from "@/components/SearchPage/SearchPanel";
import Container from "@/components/Container";

export default function SearchPage() {
  const query = "Introduction to Computer Science";
  return (
    <AuthenticatedLayout>
      <SearchHeaderPanel searchQuery={query} />

      <Container style={{ padding: "0", marginTop: "10em" }}>
        <SearchPanel />
        <ClassroomResultGroup />
        <UserResultGroup />
      </Container>
    </AuthenticatedLayout>
  );
}

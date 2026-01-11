#include <iostream>
#include <fstream>
#include <map>
#include <string>
#include <cstdlib>

#ifdef _WIN32
  #include <windows.h>
  void sleep_seconds(int s) { Sleep(s * 1000); }
#else
  #include <unistd.h>
  void sleep_seconds(int s) { sleep(s); }
#endif

using namespace std;

int main() {
    while (true) {
        ifstream file("auth.log");   // Linux
        map<string, int> ipCount;
        string line;

        if (!file.is_open()) {
            cerr << "Cannot open auth.log\n";
        } else {
            while (getline(file, line)) {
                if (line.find("Failed password") != string::npos) {
                    size_t pos = line.find("from ");
                    if (pos != string::npos) {
                        string ip = line.substr(pos + 5);
                        ip.erase(ip.find_last_not_of(" \r\n") + 1);
                        ipCount[ip]++;
                    }
                }
            }
        }

        for (auto &entry : ipCount) {
            string cmd =
                "curl -X POST http://localhost:3000/api/ingest "
                "-H \"Content-Type: application/json\" "
                "-d \"{\\\"ip\\\":\\\"" + entry.first +
                "\\\",\\\"failedAttempts\\\":" + to_string(entry.second) + "}\"";

            system(cmd.c_str());
        }

        cout << "Scan complete. Sleeping...\n";
        sleep_seconds(7);   // 🔥 no chrono, no thread
    }
}
